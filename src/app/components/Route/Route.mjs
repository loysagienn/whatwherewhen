import { useSelector } from 'react-redux';
import { selectRoute } from 'app/selectors';

const Route = ({ id, children }) => {
    const route = useSelector(selectRoute);

    if (route.id !== id) {
        return null;
    }

    return children;
};

export default Route;
