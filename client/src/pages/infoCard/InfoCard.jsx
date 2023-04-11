
const InfoCard = () => {
    // async function createCard() {
    //     const response = await fetch('http://localhost:8080/api/card', {
    //         mode: "no-cors",
    //         method: "POST"
    //     });
    //     const jsonResponse = await response.json();
    //     data = jsonResponse;
    //     console.log(jsonResponse);
    // }
    return (
        <div>
            <input placeholder="Название"/>
            <input placeholder="Тип устройства"/>
        </div>
    )
}

export default InfoCard