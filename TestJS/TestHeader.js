fetch('TestHeader.html')
    .then(response => response.text())
    .then(data => {
        /*console.log(data)*/
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const importedContent = doc.querySelector('body').innerHTML;
        document.querySelector('body').insertAdjacentHTML('afterbegin', importedContent);
    });