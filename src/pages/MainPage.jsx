import React, { useEffect, useRef, useState} from 'react'
import * as faceapi from 'face-api.js';



function MainPage({profiles}) {

    
    const arrayImages = []
    

    //Converting base64 to raw image
    for(let img = 0; img < profiles.length; img++){
      let images = new Image()
      images.src = profiles[img].image
      arrayImages.push(images)
    }

    console.log(arrayImages.length)


    
    const videoRef = useRef(null);
    

    const maxDescriptorDistance = 0.5;
    const [initializing, setInitializing] = useState();
    const [distance, setDistance ] = useState(maxDescriptorDistance)
    const [name, setName] = useState('')

    useEffect(() => {
        const loadModels = async () => {
        const MODEL_URL = process.env.PUBLIC_URL + '/models';

         
          setInitializing(true);
          Promise.all([
       
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
         
          ]).then(() => {
            startVideo();
            console.log(faceapi.nets);
          });
        }

     
        loadModels();
        }, [])
        
    
        const startVideo = () =>{
            navigator.mediaDevices.getUserMedia({
                video: true
              }).then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
              }).catch((err) => {
                console.error(err);
              });
            
        };
  
        const handleVideoOnPlay = () => {
          setInterval(async () => {
            if (initializing) {
              setInitializing(false);
            }
            
            const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
            console.log(detections)
            let result
            let faceMatcher
            let bestMatch
           

            if(detections){
              for(let i = 0; i < profiles.length; i++){
                result = await faceapi.detectAllFaces(arrayImages[i], new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
                console.log(result)
              
                  faceMatcher = new faceapi.FaceMatcher(result, maxDescriptorDistance)
                
                  bestMatch = faceMatcher.findBestMatch(detections.descriptor)
           
                 
                if(bestMatch.distance < maxDescriptorDistance){
                  setDistance(bestMatch.distance)
                  setName(profiles[i].name)
                  break;
                }else{
                  setDistance(maxDescriptorDistance)
                  continue;
                }
            }
            }
            
          }, 180)
        }

  return (
      <div>
      <span>{initializing ? 'Initializing' : 'Ready'}</span>
      <div className="display-flex justify-content-center">
          <video ref={videoRef} autoPlay muted style={{width: '100%', height: 'auto'}} onPlay={handleVideoOnPlay}/>
          {distance < maxDescriptorDistance ? <h1>{name}</h1>: <h1>Not Match</h1>}
      </div>
      </div>
  )
}

export default MainPage;