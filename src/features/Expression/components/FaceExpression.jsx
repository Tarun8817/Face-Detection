import React, { useEffect, useRef, useState } from "react";
import {
    FaceLandmarker,
    FilesetResolver,
} from "@mediapipe/tasks-vision";

export default function FaceExpression() {
    const videoRef = useRef(null);
    const faceLandmarkerRef = useRef(null);
    const animationRef = useRef(null);
    const streamRef = useRef(null);
    const lastExpressions = useRef([]);

    const [expression, setExpression] = useState("😐 Neutral");
    const [isRunning, setIsRunning] = useState(false);

    // 🔥 INIT (outside useEffect)
    const init = async () => {
        if (faceLandmarkerRef.current) return; // prevent re-init

        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
        );

        faceLandmarkerRef.current =
            await FaceLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                },
                outputFaceBlendshapes: true,
                runningMode: "VIDEO",
                numFaces: 1,
            });
    };

    // 🔥 START CAMERA
    const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
        });

        streamRef.current = stream;
        videoRef.current.srcObject = stream;

        videoRef.current.onloadeddata = () => {
            detect();
        };
    };

    // 🔥 DETECT LOOP (outside useEffect)
    const detect = () => {
        const video = videoRef.current;
        const landmarker = faceLandmarkerRef.current;

        if (!video || !landmarker) return;

        const results = landmarker.detectForVideo(
            video,
            performance.now()
        );

        if (results.faceBlendshapes?.length > 0) {
            const blendshapes = results.faceBlendshapes[0].categories;
            updateExpression(blendshapes);
        }

        animationRef.current = requestAnimationFrame(detect);
    };

    // 🔥 STOP
    const stopDetection = () => {
        setIsRunning(false);

        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
        }

        faceLandmarkerRef.current?.close();
        faceLandmarkerRef.current = null;
    };

    // 🔥 BUTTON HANDLER
    const handleStart = async () => {
        setIsRunning(true);
        await init();
        await startCamera();
    };

    // 🔥 EXPRESSION LOGIC (UNCHANGED)
    const updateExpression = (blendshapes) => {
        const getScore = (name) =>
            blendshapes.find((b) => b.categoryName === name)?.score || 0;

        const smileLeft = getScore("mouthSmileLeft");
        const smileRight = getScore("mouthSmileRight");

        const jawOpen = getScore("jawOpen");
        const browUp = getScore("browInnerUp");

        const frownLeft = getScore("mouthFrownLeft");
        const frownRight = getScore("mouthFrownRight");

        let currentExpression = "😐 Neutral";

        // ✅ SAME VALUES
        if (smileLeft > 0.5 && smileRight > 0.5) {
            currentExpression = "😊 Happy";
        } else if (jawOpen > 0.6 && browUp > 0.2) {
            currentExpression = "😲 Surprised";
        } else if (frownLeft > 0.1 && frownRight > 0.1) {
            currentExpression = "😢 Sad";
        }

        // 🔥 smoothing
        lastExpressions.current.push(currentExpression);
        if (lastExpressions.current.length > 5) {
            lastExpressions.current.shift();
        }

        const freq = {};
        lastExpressions.current.forEach((exp) => {
            freq[exp] = (freq[exp] || 0) + 1;
        });

        const stableExpression = Object.keys(freq).reduce((a, b) =>
            freq[a] > freq[b] ? a : b
        );

        setExpression(stableExpression);
    };

    // 🔥 CLEANUP ON UNMOUNT
    useEffect(() => {
        return () => {
            stopDetection();
        };
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Face Expression Detector</h2>

            <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{
                    width: "400px",
                    borderRadius: "12px",
                    border: "2px solid #333",
                }}
            />

            <h2 style={{ marginTop: "10px" }}>{expression}</h2>

            <div style={{ marginTop: "20px" }}>
                {!isRunning ? (
                    <button
                        onClick={handleStart}
                        style={{padding: "10px 20px",fontSize: "16px",fontWeight: "600",borderRadius: "8px",border: "none",cursor: "pointer",background: "linear-gradient(135deg, #4CAF50, #2e7d32)",color: "#fff",boxShadow: "0 4px 10px rgba(0,0,0,0.2)",transition: "all 0.2s ease",}}
                        onMouseOver={(e) =>
                            (e.target.style.transform = "scale(1.05)")
                        }
                        onMouseOut={(e) =>
                            (e.target.style.transform = "scale(1)")
                        }
                    >
                        ▶ Start Detection
                    </button>
                ) : (
                    <button
                        onClick={stopDetection}
                        style={{padding: "10px 20px",fontSize: "16px",fontWeight: "600",borderRadius: "8px",border: "none",cursor: "pointer",background: "linear-gradient(135deg, #f44336, #c62828)",color: "#fff",boxShadow: "0 4px 10px rgba(0,0,0,0.2)",transition: "all 0.2s ease",}}
                        onMouseOver={(e) =>
                            (e.target.style.transform = "scale(1.05)")
                        }
                        onMouseOut={(e) =>
                            (e.target.style.transform = "scale(1)")
                        }
                    >
                        ⏹ Stop Detection
                    </button>
                )}
            </div>
        </div>
    );
}