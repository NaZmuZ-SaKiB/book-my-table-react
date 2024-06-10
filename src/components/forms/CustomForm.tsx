import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TProps<T extends FieldValues> = {
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
  defaultValues?: T;
  resolver?: Resolver;
  reset?: boolean;
};

const CustomForm = <T extends FieldValues>({
  children,
  onSubmit,
  resolver,
  defaultValues,
  reset: resetForm = true,
}: TProps<T>) => {
  const formConfig: any = {};

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm<T>(formConfig);
  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<T> = (data) => {
    onSubmit(data);
    if (resetForm) reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default CustomForm;
