import {useRef , useState} from "react";

function SignaturePad() {
    // useRef gives us a direct hook into the physical DOM element
    // starts as null until react renders the canvas tag to the screen
    const canvasRef = useRef(null);

    // track whether the user is currently drawing or not
    const isDrawingRef = useRef(false);
    
    // helper function to get the 2D drawing paintbrush
    function getContext(){
        const canvas = canvasRef.current;   // point to the DOM node
        return canvas.getContext('2d');     // render in 2D
    }

    function startDrawing(e) {
        const ctx = getContext(); // CanvasRenderingContext2D object - the "pen" , it contains all the actual drawing APIs
        const rect = canvasRef.current.getBoundingClientRect(); // returns the canvas element's position and size relative to the viewport
        ctx.beginPath(); // start a new line path
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top); // mouse position relative to the browser - canvas element position relative to the browser gives mouse position relative to the canvas itself. 
        // moves the "pen" to the starting point , without drawing anything yet 
        isDrawingRef.current = true;
    }


    function draw(e) {
        if(!isDrawingRef.current) return; // safeguard to avoid accidental drawings
        const ctx = getContext();
        const rect = canvasRef.current.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.strokeStyle = "#2C2C2C";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function stopDrawing() {
        isDrawingRef.current = false;
    }

    function clearCanvas() {
        const ctx = getContext();
        ctx.clearRect(0,0, canvasRef.current.width, canvasRef.current.height);
    }

    function getSignatureData() {
        return canvasRef.current.toDataURL('image/png');
    }

    // Mobile touch response drawing

    function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    startDrawing({ clientX: touch.clientX, clientY: touch.clientY });
    }

    function handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    draw({ clientX: touch.clientX, clientY: touch.clientY });
    }

    return(
        <div className="flex flex-col items-center">
            <canvas
                ref={canvasRef}
                width={400}
                height={200}
                className="border-2 border-gray-300 rounded-lg bg-white shadow-sm cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}

                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={stopDrawing}            
            ></canvas>


            <button onClick={clearCanvas} className="ext-sm font-medium text-gray-500 hover:text-gray-800 transition">
                Clear
            </button>

        </div>
    );
}

export default SignaturePad;