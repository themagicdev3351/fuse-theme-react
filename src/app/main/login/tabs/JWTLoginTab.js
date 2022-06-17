import Typography from '@material-ui/core/Typography'; 
import * as yup from 'yup';
import _ from '@lodash';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(4, 'Password is too short - should be 4 chars minimum.'),
});

const defaultValues = {
  email: '',
  password: '',
};

function JWTLoginTab(props) { 

  return (
    <div className="w-full"> 

      <table className="w-full mt-32 text-center">
        <thead className="mb-4">
          <tr>
            <th>
              <Typography className="font-semibold text-11" color="textSecondary">
                Role
              </Typography>
            </th>
            <th>
              <Typography className="font-semibold text-11" color="textSecondary">
                Email
              </Typography>
            </th>
            <th>
              <Typography className="font-semibold text-11" color="textSecondary">
                Password
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Typography className="font-medium text-11" color="textSecondary">
                Admin
              </Typography>
            </td>
            <td>
              <Typography className="text-11">admin@fusetheme.com</Typography>
            </td>
            <td>
              <Typography className="text-11">admin</Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography className="font-medium text-11" color="textSecondary">
                Staff
              </Typography>
            </td>
            <td>
              <Typography className="text-11">staff@fusetheme.com</Typography>
            </td>
            <td>
              <Typography className="text-11">staff</Typography>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default JWTLoginTab;
