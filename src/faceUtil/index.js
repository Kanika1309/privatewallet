import * as faceapi from 'face-api.js';

export async function loadModels(
    setLoadingMessage,
    setLoadingMessageError
) {
    const MODEL_URL = process.env.PUBLIC_URL + '/models';
    try {
        setLoadingMessage('LOADING FACE DETECTOR');
        await faceapi.loadSsdMobilenetv1Model(MODEL_URL);

        setLoadingMessage('LOADING 68 FACIAL LANDMARK DETECTOR');
        await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);

        setLoadingMessage('LOADING FEATURE EXTRACTOR');
        await faceapi.loadFaceRecognitionModel(MODEL_URL);
    } catch (err) {
        setLoadingMessageError('MODEL LOADING FAILED.');
    }
}

export function isFaceDetectionModelLoaded() {
    return !!faceapi.nets.ssdMobilenetv1.params;
}

export function isFeatureExtractionModelLoaded() {
    return !!faceapi.nets.faceRecognitionNet.params;
}

export function isFacialLandmarkDetectionModelLoaded() {
    return !!faceapi.nets.loadFaceLandmark68TinyNet.params;
}

