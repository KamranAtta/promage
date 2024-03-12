import { createStyles } from '../../../utils';

export const styles = createStyles({
  
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  padding: {
    paddingLeft: '10px',
  },
  fullWidth: {
    width: '100%',
    borderRadius: '5px',
  },
  card: {
    width: '70%',
  },
  formPadding: {
    margin: 'auto',
  },
});

export const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    xs: { span: 13 },
    sm: { span: 13 },
    lg: { span: 13 },
  },
};
