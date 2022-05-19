// React Functions 
import { React } from 'react'

// CSS
import { Alert } from 'react-bootstrap'





export default function AlertBox(showIt, errorObject) {

    // console.log(errorMessage)
    // const [show, setShow] = useState(false);
    // setShow(showError)

    // if (showError.showError) {
    return (
    // <Alert variant="danger" onClose={() => setShow(false)} dismissible>
    <Alert show={showIt} variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
            { errorObject.errorMessage }
        </p>
    </Alert>
    )
}