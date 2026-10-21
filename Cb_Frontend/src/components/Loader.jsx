import {ThreeDots} from 'react-loader-spinner'

function Loader(){

  return<>
    <ThreeDots visible={true}
        height="29"
        width="30"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"></ThreeDots>
  </>
}
export default Loader;