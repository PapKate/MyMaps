function TitleAndText(props) {

    return ( 
        <div className="titleAndTextContainer">
            <h3 className="title">{props.title}</h3>
            <span className="text">{props.text}</span>
        </div>
    );
}

export default TitleAndText;
