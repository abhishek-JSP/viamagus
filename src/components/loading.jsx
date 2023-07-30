import { ColorRing } from "react-loader-spinner";
import './loading.css'

const LoadingScreen = () => {
    return <div className="loading">
        <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["black"]}
        />
    </div>
}

export default LoadingScreen;