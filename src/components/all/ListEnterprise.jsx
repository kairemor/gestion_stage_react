import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Spin } from "antd";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

import "../../assets/css/login.css";

const baseSite = "http://localhost:8000";
const thead = [
  "Logo",
  "Nom",
  "Domaine",
  "Email",
  "Telephone",
  "Site Web",
  "Nombre d'etudiants",
  "Nom du directeur"
];
function EnterpriseTable(props) {
  const [enterprises, setEnterprise] = useState([]);
  const [loading, setLoading] = useState(false);

  const goto = url => {
    props.history.push(url);
  };
  const chooseType = path => {
    const p = path.substring(22);
    switch (p) {
      case "partner":
        return "partner";
      case "potential":
        return "potential";
      default:
        return "partner";
    }
  };

  useEffect(() => {
    const fetchEnterprise = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      axios.defaults.headers = {
        "Content-Type": "Application/json",
        Authorization: `Token ${user.token}`
      };
      const res = await axios(
        `${baseSite}/internship/enterprise/${chooseType(
          props.location.pathname
        )}`
      );
      setEnterprise(res.data);
      setLoading(false);
    };

    fetchEnterprise();
    console.log(chooseType(props.location.pathname));
  }, [props.location.pathname]);

  return loading ? (
    <Spin className="center container" />
  ) : (
    <Row>
      <Col xs={12}>
        <Card>
          <CardHeader>
            <CardTitle tag="h4" className="text-center">
              Liste des Entreprises {props.location.pathname.substring(22)}{" "}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Table hover responsive>
              <thead className="text-primary">
                <tr>
                  {thead.map((prop, key) => {
                    if (key === thead.length - 1)
                      return <th key={key}>{prop}</th>;
                    return <th key={key}>{prop}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {enterprises.map((enterprise, key) => {
                  return (
                    <tr
                      key={enterprise.id}
                      onClick={() => {
                        console.log("clikecedeed");
                        goto(`/dashboard/enterprise/detail/${enterprise.id}`);
                      }}
                    >
                      <td className="img-students">
                        {" "}
                        <img
                          className="img-student"
                          alt="..."
                          src={enterprise.logo}
                        />
                      </td>
                      <td>{enterprise.name} </td>
                      <td>{enterprise.field}</td>
                      <td>{enterprise.email}</td>
                      <td>{enterprise.phone}</td>
                      <td>{enterprise.website}</td>
                      <td>{enterprise.students.length}</td>
                      <td>{enterprise.leader_name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default EnterpriseTable;