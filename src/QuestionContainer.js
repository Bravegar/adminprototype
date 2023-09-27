import {useState} from 'react';
import  Modal  from 'react-bootstrap/Modal';
import EditQuestion from './EditQuestion'; 
const QuestionContainer = ({questionList, editQuestion, toggleActive}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState({});

    const handleEditClick = (item) => {
        setIsModalOpen(true);
        setCurrentItem(item);
    }
    const handleDisableClick = (item) => {
        toggleActive(item.id);
    }

    return (

        <div>
            <Modal show={isModalOpen} onHide={()=>setIsModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditQuestion editQuestion={editQuestion} item={currentItem}/>
                </Modal.Body>

            </Modal>
        
            <ul className="list-group list-group-flush ">

                {questionList.map(item=>{return(
                    <li className="list-group-item">
                        <div>{item.question}</div> 
                        <button type="button" className="btn btn-secondary" onClick={()=>handleEditClick(item)}>Edit</button>
                        {item.active?
                             <button type="button" className="btn btn-danger" onClick={()=>{handleDisableClick(item)}}>Disable</button> 
                            :<button type="button" className="btn btn-success" onClick={()=>{handleDisableClick(item)}}>Enable</button>
                        } 
                    </li>)

                })}
            </ul>
        </div>
    )

}

export default QuestionContainer;