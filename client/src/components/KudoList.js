import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardText
} from 'reactstrap';

//Render the kudo lists
const KudoList = (props) => (

    <div>
        {props.kudoList.map((kudo) => (
                    <Card key={kudo._id} className="kudos bg-light mb-5 shadow text-center">
                        <CardHeader>
                            {kudo.title}
                        </CardHeader>
                        <CardBody>
                            <CardText>From: {kudo.from_user}</CardText>
                            <CardText>To: {kudo.to_user}</CardText>
                             <CardText>{kudo.body}</CardText>          
                        </CardBody>
                    </Card>
        ))}

    </div>

);


export default KudoList;