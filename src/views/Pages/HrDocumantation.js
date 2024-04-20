import React, { useEffect } from 'react'
import { Card, Col, Row } from 'reactstrap'
import { documentationImageLink } from '../../configs/config'
import userActions from "../../redux/user/actions";
import { useDispatch, useSelector } from 'react-redux';

const HrDocumantation = () => {

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    useEffect(() => {
        if (user?.clients?.id) {
          dispatch({
            type: userActions.GET_LOGIN_USER_DETAIL,
            payload: user?.id,
          });
        }
      }, [])

    return (
        <>

            <Row>
                <Col className='d-flex justify-content-center align-items-top mt-1' >
                    <img className='img-fluid' src={documentationImageLink} />
                </Col>
            </Row>
        </>
    )
}

export default HrDocumantation