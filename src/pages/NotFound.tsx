import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <div className="flex items-center justify-center">
            <Button type="default">
              <Link to={"/"}>Back Home</Link>
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default NotFound;
