const uplaodBox = document.querySelector(".upload-box"),
previewImg = uplaodBox.querySelector("img"),
fileInput = uplaodBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".Height input"),
ratioInput = document.querySelector(".Ratio input");

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
})
 
fileInput.addEventListener("change", loadFile);
uplaodBox.addEventListener("click", () => fileInput.click());