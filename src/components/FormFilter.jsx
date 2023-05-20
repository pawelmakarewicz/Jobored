import {
  Text, NumberInput, List, Select, Button, Group, Title, Box,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconChevronDown, IconX } from '@tabler/icons-react';

const dataFromState = ['React', 'Angular', 'Svelte', 'Vue'];

export default function FormFilter(props) {
  const form = useForm({
    initialValues: {
      salaryFrom: '',
      salaryTo: '',
      currentBranch: '',
    },
  });

  return (
    <Box p={20} maw={315}>
      <Group position="apart" mt="md">
        <Title order={2}>Фильтры</Title>
        <Button rightIcon={<IconX size="1rem" />} variant="white" color="gray" type="reset" onClick={() => form.reset()}>
          <Text fz="xs">Сбросить все</Text>
        </Button>
      </Group>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <List>
          <List.Item>
            <Group position="left" mt="md">
              <Title order={3}>Отрасль</Title>
            </Group>
            <Select
              label="Branch"
              placeholder="Выберете отрасль"
              rightSection={<IconChevronDown size="1rem" />}
              rightSectionWidth={30}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={dataFromState}
              {...form.getInputProps('currentBranch')}
            />
          </List.Item>
          <List.Item>
            <Group position="left" mt="md">
              <Title order={3}>Оклад</Title>
            </Group>
            <NumberInput
              placeholder="От"
              min={0}
              max={form.values.salaryTo}
              {...form.getInputProps('salaryFrom')}
            />
            <NumberInput
              placeholder="До"
              min={form.values.salaryFrom}
              {...form.getInputProps('salaryTo')}
            />
          </List.Item>
        </List>
        <Group position="center" mt="md">
          <Button type="submit" style={{ width: '100%' }}>Применить</Button>
        </Group>
      </form>
    </Box>
  );
}
