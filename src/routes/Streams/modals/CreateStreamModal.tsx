import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { SideMotionContainer, SideMotionContainerRef } from '~/components/SideMotionContainer';
import { mkUseStyles, useTheme } from '~/utils/theme';
import { InternalModalProps } from '~/contexts/ModalManager/types';
import { CreateStreamResponse, StreamService } from '~/api/Stream';
import { AnimatedTick } from '~/components/icons/Tick';

const StreamSchema = z.object({
  name: z.string(),
});
type StreamSchemaType = z.infer<typeof StreamSchema>;

enum StepCards {
  STREAM_DATA = 'stream_data',
  RESPONSE = 'response',
}

type CreateStreamModalProps = Partial<InternalModalProps>;

export const CreateStreamModal = (_p: CreateStreamModalProps) => {
  const [loading, setLoading] = useState(false);
  const [streamData, setStreamData] = useState<CreateStreamResponse>();
  const styles = useStyles();
  const theme = useTheme();
  const containerRef = useRef<SideMotionContainerRef>(null);
  const streamFormMethods = useForm<StreamSchemaType>({
    resolver: zodResolver(StreamSchema),
  });

  const handleSaveStream = async (data: StreamSchemaType) => {
    setLoading(true);

    try {
      const response = await StreamService.create(data);
      setStreamData(response);
      containerRef.current?.setActiveCard(StepCards.RESPONSE);
    } catch (e) {
      streamFormMethods.setError('name', { message: 'Error creating stream' });
    }
    setLoading(false);
  };

  return (
    <SideMotionContainer ref={containerRef} cards={[StepCards.STREAM_DATA, StepCards.RESPONSE]} cardWidth={400}>
      <FormProvider {...streamFormMethods}>
        <form style={styles.form} onSubmit={streamFormMethods.handleSubmit(handleSaveStream)} noValidate>
          <Input name='name' label='Name' description='Enter stream name' type='string' />
          <Button label='Next' loading={loading} style={styles.button} />
        </form>
      </FormProvider>
      <div style={styles.content}>
        <div style={styles.circle}>
          <AnimatedTick size={30} />
        </div>
        <p style={{ fontSize: 18 }}>
          Successfully created: <b>{streamData?.name}</b>
        </p>
        <p style={{ color: theme.colors.red, alignSelf: 'flex-start', marginLeft: theme.spacing.m }}>
          Don't forget to add your data in the app <br /> it won't be available later
        </p>
        <pre style={styles.pre}>
          URL:
          <br />
          {import.meta.env.VITE_SOCKET_URL + '/api/stream/log'}
          <br />
          <br />
          TOKEN:
          <br />
          {streamData?.token}
        </pre>
      </div>
    </SideMotionContainer>
  );
};

const useStyles = mkUseStyles((t) => ({
  container: {
    margin: 'auto',
    alignSelf: 'center',
    padding: t.spacing.m,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    gap: t.spacing.m,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: t.spacing.m,
  },
  title: {
    alignSelf: 'center',
    userSelect: 'none',
  },
  button: {
    marginTop: t.spacing.m,
    flex: 1,
  },
  circle: {
    alignSelf: 'center',
    padding: t.spacing.m,
    backgroundColor: t.colors.lightGreen,
    borderRadius: '50px',
  },
  pre: {
    borderRadius: t.borderRadius.default,
    padding: t.spacing.m,
    backgroundColor: t.colors.blue01,
  },
}));
