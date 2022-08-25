import { Flex, Heading, Button, Box } from '@chakra-ui/react';
import { BiPlus, BiArrowBack } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { useOutlet, Link, useNavigate } from 'react-router-dom';

import { categorySlice } from '../../../store/category/category-slice';

const AdminCategories = () => {
  const dispatch = useDispatch();
  const { isUpdating, isCreating } = useSelector(
    (state: any) => state.category
  );
  const navigate = useNavigate();
  const outlet = useOutlet();

  const handleNavigation = (e: any) => {
    e.preventDefault();

    if (isCreating || isUpdating) {
      return dispatch(categorySlice.actions.categoriesView());
    }
    return dispatch(categorySlice.actions.createCategoryView());
  };
  return (
    <Flex width="full" direction="column" gap={4}>
      <Flex
        p={8}
        justify="space-between"
        align="center"
        width="full"
        bg="white"
        borderRadius="md"
      >
        <Heading size="xs">
          {isCreating && 'Create category'}
          {isUpdating && 'Update category'}
          {!isUpdating && !isCreating && 'Categories'}
        </Heading>
        <Button
          onClick={handleNavigation}
          variant="primary"
          leftIcon={isUpdating || isCreating ? <BiArrowBack /> : <BiPlus />}
        >
          {isCreating || isUpdating ? 'Back to categories' : 'Create'}
        </Button>
      </Flex>
      <Box bg="white" width="full" height="full" p={8} borderRadius="md">
        {outlet}
      </Box>
    </Flex>
  );
};

export default AdminCategories;
