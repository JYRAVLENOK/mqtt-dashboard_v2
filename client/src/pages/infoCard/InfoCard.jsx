import {useContext, useEffect} from "react";
import {Context} from "../../index";
import {deleteOneCard, fetchOneCard} from "../../http/cardAPI";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const InfoCard = observer(() => {
    const {card} = useContext(Context)

    useEffect(() => {
        // fetchOneCard()
    }, [])
    const deleteCard = (event) => {
        // deleteOneCard()
    }
    return (
        <div>
            <p>Название: </p>
            <Button
                onClick={deleteCard}
            >Удалить</Button>
        </div>
    )
})

export default InfoCard