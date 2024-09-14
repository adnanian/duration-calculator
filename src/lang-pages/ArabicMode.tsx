import React from "react";

// Lookup later. https://dev.to/franklin030601/building-a-multi-language-app-with-react-js-2och
const ArabicMode = () => {
    // return <h1 dir="rtl" lang="ar">مرحبا للجميع! أنا اسمي عدنان، وأنا أحب البرمجة. أتمنى لكم يوما سعيدا.</h1>
    return (
        <main dir="rtl" lang="ar">
            <h1>حاسبة المدة</h1>
            <h2>أداة بسيطة لحساب مددكم بغض النظر عن الوقت.</h2>
            <table>
                <thead>
                <tr>
                    <th>ساعات</th>
                    <th>دقائق</th>
                    <th>ثوانٍ</th>
                    <th>ميلي ثانية</th>
                    <th>عملية</th>
                    <th>المضروب به / المقسوم عليه</th>
                </tr>
                </thead>
            <tbody>
            </tbody>
      </table>
        </main>
    );
}

export default ArabicMode;