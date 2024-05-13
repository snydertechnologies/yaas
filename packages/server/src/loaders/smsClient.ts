import SMSClient from '@bigcapital/server/services/SMSClient';
import EasySMSGateway from '@bigcapital/server/services/SMSClient/EasySmsClient';

export default (token: string) => {
  const easySmsGateway = new EasySMSGateway(token);
  const smsClient = new SMSClient(easySmsGateway);

  return smsClient;
};
