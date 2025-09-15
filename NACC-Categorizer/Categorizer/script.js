document.addEventListener("DOMContentLoaded", function () {
    const textBox = document.querySelector('.textbox');
    const classifyButton = document.querySelector('.button-container .button');
    const selectList = document.querySelector('.select-list');

    classifyButton.addEventListener('click', function () {
        const textData = textBox.value;

        const apiEndpoint = 'https://6gzwkq3j6kzapmic7bjokysf7m0hftpj.lambda-url.ap-southeast-1.on.aws/';

        const data = {
            message: textData
        };

        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);

            const category = result.result.trim();

            for (let i = 0; i < selectList.options.length; i++) {
                const optionText = selectList.options[i].text.replace(/^\d+\.\d*\s*/, '').trim();

                if (optionText === category) {
                    selectList.selectedIndex = i;
                    break;
                }   
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
