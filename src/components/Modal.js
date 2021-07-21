import classes from './Modal.module.css'
function Modal(props) {

  /*called on the close of the popup */
    function cancelHandler() {
        props.onCancel();
    }

    return (
        <div className={classes.modalNew}>
        <div className="row">
              <img
                src={`${process.env.PUBLIC_URL}/${props.data.image_url}`}
                alt={props.data.name}
                width="150" className="col-4"
                height="150"
              ></img>
              <div className="col-8">
                <h5 className={classes.text_padding}>{props.data.name}</h5>
                <div className="text-muted">{props.data.region}</div>
              </div>
            </div>
            <div className="row">
                <h2 className="col-12">{props.languageData.pricing.value}</h2>
                <div className="col-4 pt-3">1 {props.languageData.week.value} - 1 {props.languageData.month.value}</div>
                <div className="offset-6 pt-3 col-2">{props.data.price.value}</div>
                <div className="col-4 pt-3">6 {props.languageData.months.value}</div>
                <div className="offset-6 pt-3 col-2">{props.data.price.value}</div>
                <div className="col-4 pt-3">1 {props.languageData.year.value}</div>
                <div className="offset-6 pt-3 col-2">{props.data.price.value}</div>
            </div>
            <div className="text-center">
            <button className={[classes.btn, classes.btn__alt].join(' ')} onClick={cancelHandler}> {props.languageData.close.value}</button>

            </div>
      </div>
    )
}

export default Modal;