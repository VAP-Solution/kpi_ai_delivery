document.addEventListener("DOMContentLoaded", function () {
    const textBox = document.querySelector('.textbox');
    const classifyButton = document.querySelector('.button-container .button');
    const resultTextBox = document.querySelectorAll('.textbox')[1];

    classifyButton.addEventListener('click', function () {
        const textData = textBox.value;

        const apiEndpoint = 'https://lr26qwqqso5cdoz2qrwe4575ke0ktiqp.lambda-url.ap-southeast-1.on.aws/';

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

            let formattedResult = '';

            if (result.result.Summary) {
                formattedResult += `สรุปข้อกล่าวหา: ${result.result.Summary}\n`;
            }
            if (result.result.AllegedParty) {
                formattedResult += `ผู้ถูกกล่าวหา: ${result.result.AllegedParty}\n`;
            }
            if (result.result.Accusation) {
                formattedResult += `เรื่องที่กล่าวหา: ${result.result.Accusation}\n`;
            }
            if (result.result.Location) {
                formattedResult += `สถานที่: ${result.result.Location}\n`;
            }
            if (result.result.Amount) {
                formattedResult += `มูลค่าความเสียหาย: ${result.result.Amount}`;
            }

            resultTextBox.value = formattedResult.trim();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
