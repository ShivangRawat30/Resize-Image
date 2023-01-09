const uplaodBox = document.querySelector(".upload-box"),
previewImg = uplaodBox.querySelector("img"),
fileInput = uplaodBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".Height input"),
ratioInput = document.querySelector(".Ratio input"),
qualityInput = document.querySelector(".quality input"),
downloadBtn = document.querySelector(".download-btn");

const loadFile = (e) => {
    const file = e.target.files[0]; // getting first user selected file
    if(!file) return; //return if user hasn't selected any file
    previewImg.src = URL.createObjectURL(file); // passing selected file url to preview img src
    previewImg.addEventListener("load", () => { // once image loadeed
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    });
}

widthInput.addEventListener("keyup", () => {
    //getting height according to the ratio checkbox status
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});
 
heightInput.addEventListener("keyup", () => {
    //getting width according to the ratio checkbox status
    const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
});

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d")

    // if quality checkbox is checked, pass 0.7 to imgQuality else pass 1.0
    // 1.0 is 100% quality where 0.7 is 70% of total. you can pass from 0.1 - 1.0

    const imgQuality = qualityInput.checked ? 0.7 : 1.0;

    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    // document.body.appendChild(canvas);

    a.href = canvas.toDataURL("image/jpeg", imgQuality);
    a.download = new Date().getTime(); // passing current time as download value
    a.click(); //clicking <a> element so the file download
}

downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadFile);
uplaodBox.addEventListener("click", () => fileInput.click());