import { Layout, Typography } from "antd";
import "./shoppingList.css";

const ShoppingList = () => {
  const { Header } = Layout;

  return (
    <Layout>
      <Header className="shopping-navbar">
        <Typography.Text className="nav-title">Navbar</Typography.Text>
      </Header>
    </Layout>
  );
};

export default ShoppingList;
