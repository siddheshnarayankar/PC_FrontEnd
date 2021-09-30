import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import { professionalAction, userActions } from "../../_actions";
import { AppTable } from "../../_components/AppTable";
import {
    Drawer,
    Form,
    Button,
    Col,
    Row,
    Input,
    Select,
    DatePicker,
    Divider,
    PageHeader,
    Descriptions,
    message,
    Card,
    Avatar,
    List
} from "antd";
import { ApartmentOutlined, EnvironmentOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import './Dashboard.css';


const data = [
    {
        title: 'Total App User',
        bgColor: '#5c78f1',
        result: '1000',
        icon: <UserOutlined />
    },
    {
        title: 'Registered Police Station',
        bgColor: '#00bdd0',
        result: '1000',
        icon: <ApartmentOutlined />
    },
    {
        title: 'एकूण आरोपी',
        bgColor: '#fa508e',
        result: '1000',
        icon: <TeamOutlined />
    },
    {
        title: 'Gps मध्ये आज चेक केलेले आरोपी',
        bgColor: '#00d596',
        result: '1000',
        icon: <EnvironmentOutlined />
    },
];
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        data: [
            {
                id: 1,
                title: 'Total App User',
                bgColor: '#5c78f1',
                result: 1000,
                icon: <UserOutlined />,
                url: '/AppUserLogin'
            },
            {
                id: 2,
                title: 'Registered Police Station',
                bgColor: '#00bdd0',
                result: 1000,
                icon: <ApartmentOutlined />,
                url: '/users'
            },
            {
                id: 3,
                title: 'एकूण आरोपी',
                bgColor: '#fa508e',
                result: 1000,
                icon: <TeamOutlined />,
                url: '/finds'
            },
            {
                id: 4,
                title: 'Gps मध्ये आज चेक केलेले आरोपी',
                bgColor: '#00d596',
                result: 1000,
                icon: <EnvironmentOutlined />,
                url: '/gps'
            },
        ]
    }
    componentDidMount() {
        const { cityId } = this.props.user;
        console.log(this.state.data)
        professionalAction.getTotalAppUsersCount(cityId).then((res) => {
            res && res && res.json().then((resp) => {
                this.totalDataUpdate(1, resp)
            })
        });
        professionalAction.getTotalCriminalCount(cityId).then((res) => {
            res && res && res.json().then((resp) => {
                this.totalDataUpdate(3, resp)
            })
        });
        professionalAction.getTotalRegisterPoliceStationCount(cityId).then((res) => {
            res && res && res.json().then((resp) => {
                this.totalDataUpdate(2, resp)
            })
        });
        professionalAction.getTotalTodayGPSCount(cityId).then((res) => {
            res && res && res.json().then((resp) => {
                this.totalDataUpdate(4, resp)
            })
        });
    }

    totalDataUpdate = (id, resp) => {
        const items = Object.assign({}, this.state.data);
        const match = _.filter(items, (item) => item.id === id);
        const notMatch = _.filter(items, (item) => item.id !== id);
        const matchUpdated = { ...match[0], result: resp.result };
        this.setState({
            data: [
                matchUpdated,
                ...notMatch
            ]
        })
    }

    gotToPages(url) {
        this.props.history.push(url);
    }

    render() {

        return (
            <div className="dashboard-card-wrapper">
                <List
                    itemLayout="horizontal"
                    dataSource={_.sortBy(this.state.data, 'id')}
                    renderItem={item => (
                        <List.Item style={{ display: 'inline-block', width: '33%' }} onClick={() => { this.gotToPages(item.url) }}>
                            <List.Item.Meta
                                style={{
                                    color: '#ffff', backgroundColor: item.bgColor,
                                    padding: '15px',
                                    margin: '10px', boxShadow: '2px 2px 5px 0px #797979'
                                }}
                                avatar={<Avatar style={{ backgroundColor: '#fff', color: item.bgColor }} icon={item.icon} />}
                                title={item.title}
                                description={item.result ? item.result : '0'}
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication, professionals } = state;
    const { user } = authentication;
    const { pc_cities, basicDistricts } = professionals;
    return {
        user,
        users,
        pc_cities,
        basicDistricts,
    };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };
