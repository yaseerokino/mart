import { modelOptions, prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { User } from './user.model';

@modelOptions({
  schemaOptions: { collection: 'sessions', timestamps: true },
})
export class Session {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ default: true })
  valid: boolean;
}

const SessionModel = getModelForClass(Session);
export default SessionModel;
