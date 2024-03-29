import React from 'react'
import './FaceRecognition.css';

const FaceRecoGnition =({imageUrl,box})=> {
    return (
        <div className='center'>
            <div className='absolute nt2'>
            <img id='inputimage' alt=' ' src={imageUrl} width='500px' height='auto'/> 
            <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>
        </div>
    )
}

export default FaceRecoGnition;
