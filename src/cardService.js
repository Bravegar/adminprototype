const generateCardArr = () =>{
    const cardArr =[];
    for(let i = 0; i < 50; i++)
    {
        const generatedObj = {};
        generatedObj.id = i;
        generatedObj.question = "What is a medicine?";
        generatedObj.questionImg = "./somewhere";
        generatedObj.answer = "Its good for you";
        generatedObj.answerImg = "./somewhereElse";
        generatedObj.type = "normal";
        generatedObj.category = "B1";
        generatedObj.chapter = "Chapter 1";
        generatedObj.references = "Ref 1";
        generatedObj.active = true;

        cardArr.push(generatedObj);
    }
    return cardArr;
};


export default generateCardArr;