import createCardDialog from "./CreateCardDialog.scss"

const CreateCardDialog = ({active, setActive}) => {
    return (
       <div className={active ? "createCardDialog__active" : "createCardDialog" } onClick={() => setActive(false)}>
           <div className="createCardDialog__content" onClick={e => e.stopPropagation()}></div>
       </div>
    )
}
export default CreateCardDialog