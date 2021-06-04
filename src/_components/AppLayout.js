import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  FileSearchOutlined, 
  AppstoreAddOutlined
} from "@ant-design/icons";
import { Link, Redirect, useNavigate, useLocation, useHistory  } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const AppLayout = (props) => {
  let history = useHistory();
  let location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [users, setUsers] = useState();

  const [activeMenu, setActiveMenu] = useState();
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{
    if(location.pathname==='/AppUserLogin'){
      setTimeout(() => {
        setActiveMenu('2')
      }, 100);
    }else if(location.pathname==='/'){
      setTimeout(() => {
        setActiveMenu('1')
      }, 100);
    }
   else if(location.pathname==='/finds'){
    setTimeout(() => {
      setActiveMenu('3')
    }, 100);
  }
  else if(location.pathname==='/news'){
    setTimeout(() => {
      setActiveMenu('4')
    }, 100);
  }
  else if(location.pathname==='/notifications'){
    setTimeout(() => {
      setActiveMenu('5')
    }, 100);
  }
  else if(location.pathname==='/gps'){
    setTimeout(() => {
      setActiveMenu('6')
    }, 100);
  }  else if(location.pathname==='/wanted'){
    setTimeout(() => {
      setActiveMenu('7')
    }, 100);
  }  else if(location.pathname==='/help'){
    setTimeout(() => {
      setActiveMenu('9')
    }, 100);
  } else if(location.pathname==='/aboutus'){
    setTimeout(() => {
      setActiveMenu('8')
    }, 100);
  }else if(location.pathname==='/reports'){
    setTimeout(() => {
      setActiveMenu('11');
      setActiveMenu('111');
    }, 100);
  }
  },[location.pathname])
  

  useEffect(()=>{
    if(user && user.role && user.role==='2'){
      return <Redirect to='/login'  />
    }
  },[user])

 
  const changeRoute = (activeKey) =>{
   history.push("/AppUserLogin");
  }

  // const linkTarget = {
  //   pathname: "/AppUserLogin",
  //   key: Math.random(), // we could use Math.random, but that's not guaranteed unique.
  //   state: {
  //     applied: false
  //   }
  // };
  return (
    <Layout
      style={{ minHeight: "100vh" }}
      className={`${!collapsed ? "" : "collapsed"}`}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          {collapsed ? (
            <span style={{ whiteSpace: "nowrap" }}>CMIS</span>
          ) : (
            <span style={{ whiteSpace: "nowrap" ,display:'flex',justifyContent:'center',flexDirection:'column',color: '#c5c2c2'}}>
              <span >CMIS</span>
              <small style={{fontSize:'8px'}}>Criminal Monitoring Intelligent System</small>
            </span>
          )}
        </div>
        <Menu theme="dark"  mode="inline" selectedKeys={[activeMenu]}    defaultSelectedKeys={['1']}   >
          {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item> */}
          {
            user && user.role && user.role==='4'?(
             <>
             <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2"  icon={<AppstoreAddOutlined  />}  > 
             <Link to="/AppUserLogin">App Users</Link>
            </Menu.Item>
            <Menu.Item key="3"  icon={<FileSearchOutlined />}  > 
             <Link to="/finds">आरोपी शोधा</Link>
            </Menu.Item>
            <Menu.Item key="6"  icon={<FileSearchOutlined />}  > 
             <Link to="/gps">GPS Details</Link>
            </Menu.Item>
            <Menu.Item key="7"  icon={<FileSearchOutlined />}  > 
             <Link to="/wanted">Wanted</Link>
            </Menu.Item>
            <Menu.Item key="4"  icon={<FileSearchOutlined />}  > 
                   <Link to="/news">News</Link>
             </Menu.Item>
             {/* <Menu.Item key="10"  icon={<FileSearchOutlined />}  > 
                   <Link to="/reports">Reports</Link>
             </Menu.Item> */}
             <SubMenu
                  key="11"
                  icon={<UserOutlined />}
                  title="Reports"
              >
            {/* <Menu.Item key="3">आरोपी शोधा</Menu.Item> */}
              <Menu.Item key="111">
                <Link to="/reports">आरोपी सांख्यकी अहवाल</Link>
              </Menu.Item>
            </SubMenu>
            </>
            ):user && user.role && user.role==='8'?((
                <>
                 <Menu.Item key="1" icon={<UserOutlined />}>
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="5"  icon={<FileSearchOutlined />}  > 
                <Link to="/notifications">Notifications</Link>
                </Menu.Item>
                <Menu.Item key="8"  icon={<FileSearchOutlined />}  > 
                   <Link to="/aboutus">About us</Link>
                </Menu.Item>
                <Menu.Item key="9"  icon={<FileSearchOutlined />}  > 
                <Link to="/help">Help</Link>
                </Menu.Item>
                </>
            )):(
              <SubMenu
                  key="sub1"
                  icon={<UserOutlined />}
                  title="प्रोफेशनल क्रिमिनल"
              >
            {/* <Menu.Item key="3">आरोपी शोधा</Menu.Item> */}
              <Menu.Item key="1">
                <Link to="/ProfessionalForm">नवीन आरोपी समाविष्ट</Link>
              </Menu.Item>
            </SubMenu>
            )
          }
         
         
          {/* <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu> */}
        </Menu>
      </Sider>
      <Layout
        className="site-layout"
        className={`${!collapsed ? "" : "collapsed"}`}
      >
        <Header
          className="site-layout-background"
          style={{ padding: 0, position: "fixed" }}
          className={`${!collapsed ? "" : "collapsed"}`}
        >
          <Menu theme="dark" mode="horizontal">
           
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.userid}>
              <Menu.Item key="setting:1">Profile {users}</Menu.Item>
              <Menu.Item key="setting:2">
                <Link to="/login">Logout</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Header>
        <Content
          style={{ margin: "0 16px", paddingTop: "60px" }}
          className={`${!collapsed ? "" : "collapsed"}`}
        >
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb> */}
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {props.component}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©2021 Developed By I MARK TECHNOLOGY
        </Footer>
      </Layout>
    </Layout>
  );
};
