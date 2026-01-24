import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './PlaceOrderButton.css';

gsap.registerPlugin(MotionPathPlugin);

const PlaceOrderButton = ({ onClick, isLoading, disabled }) => {
  const [hasRun, setHasRun] = useState(false);
  const svgRef = useRef(null);
  
  const baseRef = useRef(null);
  const btnBaseRef = useRef(null);
  const txtSendRef = useRef(null);
  const paperPlaneRef = useRef(null);
  const paperPlanePathRef = useRef(null);
  const paperPlaneRouteRef = useRef(null);
  const rectSentItemsRef = useRef(null);
  const mask1Ref = useRef(null);
  const tickMarkRef = useRef(null);

  useEffect(() => {
    gsap.set(paperPlaneRouteRef.current, { drawSVG: "0% 0%" });
    gsap.set(rectSentItemsRef.current, { x: "-=240" });
    
  }, []);

  const handleClick = (e) => {
    if (disabled || isLoading || hasRun) return;
    setHasRun(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
            if (onClick) onClick(e);
        }, 1000); 
      }
    });


    tl.to(baseRef.current, { duration: 0.1, scale: 0.9, transformOrigin: "50% 50%" })
      .to(baseRef.current, { duration: 0.2, scale: 1, transformOrigin: "50% 50%" });

    tl.to(btnBaseRef.current, { 
        duration: 0.6, 
        attr: { width: 130, height: 130, rx: 65, x: 435 }, 
        ease: "power1.inOut"
    }, "start");

    tl.to(txtSendRef.current, { duration: 0.6, scale: 0, opacity: 0, transformOrigin: "50% 50%" }, "start");
    
    tl.to(paperPlaneRef.current, {
        duration: 1.5,
        ease: "power1.inOut",
        motionPath: {
            path: "#paperPlaneRoute",
            align: "#paperPlaneRoute",
            alignOrigin: [0.5, 0.5],
            autoRotate: true
        }
    }, "start");

    tl.to(btnBaseRef.current, {
        duration: 0.5,
        attr: { width: 480, height: 143, rx: 23, x: 460 }, 
        fill: "#ffffff", 
        ease: "power1.inOut"
    }, "revealStart+=1.0");

    tl.to(
        rectSentItemsRef.current, 
        { x: 0, opacity: 1, duration: 0.5 }, 
        "revealStart+=1.0"
    );
    
    tl.to(
        mask1Ref.current,
        { x: "-=260", duration: 0.5, ease: "power1.inOut" },
        "revealStart+=1.0"
    );
    
    tl.to(paperPlaneRef.current, { scale: 0, duration: 0.2 }, "revealStart+=1.3");
    
    tl.to(paperPlaneRef.current, { scale: 0, duration: 0.2 }, "revealStart+=1.3");
    
  };

  return (
    <div className="placeOrderButtonContainer">
      <svg viewBox="300 150 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" ref={svgRef}>
        
        <path id="paperPlaneRoute" ref={paperPlaneRouteRef} d="M563.558,526.618 C638.854,410.19 787.84,243.065 916.53,334.949 1041.712,424.328 858.791,877.927 743.926,856.655 642.241,838.669 699.637,688.664 700,540" stroke="none" strokeWidth="3" />
        
        <g id="rectSent" clipPath="url(#clipPath)">
            <g id="rectSentItems" ref={rectSentItemsRef} style={{opacity: 0}}> 
                <rect id="sentBase" x="460" y="468.5" width="480" height="143" rx="23" fill="white"/>
                <text id="txtSent" fill="#4F67ED" xmlSpace="preserve" style={{whiteSpace: 'pre'}} fontFamily="Roboto" fontSize="82" fontWeight="bold" letterSpacing="0.025em"><tspan x="637.487" y="568.027">Sent!</tspan></text>
            </g>
        </g>

        <g id="base" ref={baseRef} onClick={handleClick}>
          <g filter="url(#flShadow)">
              <rect id="btnBase" ref={btnBaseRef} x="418.117" y="460.55" width="563.765" height="158.899" rx="27" fill="#F1F3FF" />
          </g>
          
          <text id="txtSend" ref={txtSendRef} fill="#291D89" xmlSpace="preserve" style={{whiteSpace: 'pre'}} fontFamily="Roboto" fontSize="82" fontWeight="bold" letterSpacing="0.06em"><tspan x="679.379" y="568.027">Place order</tspan></text>
          
          <g id="paperPlane" ref={paperPlaneRef} style={{transformOrigin: "0px 0px 0px"}} transform="matrix(0.8396,0.5432,-0.5432,0.8396,377.09924,-222.6639)">
            <path id="paperPlanePath" ref={paperPlanePathRef} d="M560.611 481.384C562.003 479.263 565.113 479.263 566.505 481.384L607.063 543.177C615.657 556.272 607.507 573.375 592.766 575.676L566.422 557.462V510.018C566.422 508.436 565.14 507.154 563.558 507.154C561.976 507.154 560.693 508.436 560.693 510.018V557.462L534.349 575.676C519.609 573.375 511.459 556.272 520.053 543.177L560.611 481.384Z" fill="#4F67EB"/>
          </g>
        </g>
        
        <defs>
          <clipPath id="clipPath">
            <rect id="mask1" ref={mask1Ref} x="700" y="450" width="520" height="180" fill="white" />
          </clipPath>
          <filter id="flShadow" x="0" y="0" width="1000" height="1000" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dx="4" dy="4"/>
            <feGaussianBlur stdDeviation="3.5"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.5125 0 0 0 0 0.420677 0 0 0 0 0.420677 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default PlaceOrderButton;
