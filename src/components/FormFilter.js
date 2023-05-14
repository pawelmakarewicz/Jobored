import { Text, NumberInput, List, Select, Button, Group, Box, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconChevronDown, IconX } from '@tabler/icons-react';

 export default function FormFilter() {
  const form = useForm({
    initialValues: {
      branches: [],
      salaryFrom: '',
      salaryTo: '',
      currentBranch:'',
    },
  });

  return (
    <Box maw={315} mx="auto">
      <Group position="apart" mt="md">
        <Title order={2}>Фильтры</Title>
        <Button rightIcon={<IconX size="1rem" />} variant="white" color="gray" type="reset">
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
            label="Отрасль"
            placeholder="Выберете отрасль"
            rightSection={<IconChevronDown size="1rem" />}
            rightSectionWidth={30}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            data={['React', 'Angular', 'Svelte', 'Vue']}
          />
        </List.Item>
        <List.Item>
          <Group position="left" mt="md">
            <Title order={3}>Оклад</Title>
          </Group>    
          <NumberInput
            label="salaryFrom"
            placeholder="От"
            min={0}
          />
          <NumberInput
            label="salaryTo"
            placeholder="До"
            min={0}
          />
          </List.Item>
      </List>
      <Group position="center" mt="md">
        <Button type="submit">Применить</Button>
      </Group>
      </form>
    </Box>
  );
}