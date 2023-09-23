const puppeteer = require('puppeteer');

module.exports = async function (context, req) {
    context.log('HTTP trigger function processed a request.');

    const htmlCode = req.body.htmlCode;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlCode);
    const pdfBuffer = await page.pdf();
    await browser.close();

    context.res = {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="output.pdf"'
        },
        body: pdfBuffer
    };
};
