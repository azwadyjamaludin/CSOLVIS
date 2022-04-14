import Swal from "sweetalert2";
import '@sweetalert2/theme-material-ui';

function SweetAlertSetting(error)  {
    Swal.fire({
        icon: 'error',
        title: '',
        text: `${error}`,
    }).then((r) => {
    })
}

export default {SweetAlertSetting}
