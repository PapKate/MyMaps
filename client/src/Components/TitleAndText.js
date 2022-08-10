function TitleAndText({Title, Text}) {

    return ( 
        <div className="titleAndTextContainer">
            <h3 className="title">{Title}</h3>
            <span className="text">{Text}</span>
        </div>
    );
}

export default TitleAndText;
