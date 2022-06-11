function toDataUrl(url: string, callback?: (result: string | ArrayBuffer | null) => void) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const reader = new FileReader();
        reader.onloadend = function() {
            if (callback) {
                callback(reader.result);
            }
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

export default toDataUrl