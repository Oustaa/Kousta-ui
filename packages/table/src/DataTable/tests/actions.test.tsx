import DataTable from "..";
import { render, screen, fireEvent } from "@testing-library/react";
import { TableProps } from "../_props";
import userEvent from "@testing-library/user-event";
import { data, headers, UserType } from "./test-setup";

function renderTableWithExtraProps(props: Partial<TableProps<unknown>>) {
  render(
    // @ts-expect-error this is not an error
    <DataTable<UserType>
      {...props}
      data={data}
      headers={headers}
      loading={false}
      title="this is a title"
      keyExtractor={(row) => row.name}
    />,
  );
}

describe("DataTable Actions", () => {
  describe("Delete action", () => {
    const deleteFunc = jest.fn();

    beforeEach(() => {
      renderTableWithExtraProps({
        actions: {
          delete: {
            canDelete: true,
            onDelete: deleteFunc,
          },
        },
      });
    });

    it("Delete action should be visible", async () => {
      const deleteButton = screen.getAllByRole("button", {
        name: /delete/i,
      });
      expect(deleteButton).toHaveLength(2);
    });

    it("Clicking the delete button should envoke delete function", async () => {
      const deleteButton = screen.getAllByRole("button", {
        name: /delete/i,
      });

      fireEvent.click(deleteButton[0]);

      expect(deleteFunc).toHaveBeenCalled();
    });
  });

  describe("Edit action", () => {
    const editFunc = jest.fn();

    beforeEach(() => {
      renderTableWithExtraProps({
        actions: {
          edit: {
            canEdit: true,
            onEdit: editFunc,
          },
        },
      });
    });

    it("Edit action should be visible", async () => {
      const editButton = screen.getAllByRole("button", {
        name: /edit/i,
      });
      expect(editButton).toHaveLength(2);
    });

    it("Clicking the edit button should envoke edit function", async () => {
      const editButton = screen.getAllByRole("button", {
        name: /edit/i,
      });

      fireEvent.click(editButton[0]);

      expect(editFunc).toHaveBeenCalled();
    });
  });

  describe("Search", () => {
    const searchFunc = jest.fn();

    beforeEach(() => {
      renderTableWithExtraProps({
        actions: {
          search: { onSearch: searchFunc },
        },
      });
    });

    it("Search function should be called", async () => {
      const user = userEvent.setup();
      const searchTerm = "search";

      const searchInput = screen.getByRole("textbox", {
        name: /search-input/i,
      });
      expect(searchInput).toBeInTheDocument();

      await user.clear(searchInput);
      await user.type(searchInput, searchTerm);
      expect(searchInput).toHaveValue(searchTerm);

      const searchButton = screen.getByRole("button", { name: /search/i });
      expect(searchButton).toBeInTheDocument();

      await user.click(searchButton);
      expect(searchFunc).toHaveBeenCalledTimes(1);
      expect(searchFunc).toHaveBeenCalledWith(
        expect.objectContaining({
          search: searchTerm,
        }),
      );

      // testing that the search is only begin called with distinct search query
      await user.type(searchInput, "{Enter}");
      expect(searchFunc).toHaveBeenCalledTimes(1);
      await user.click(searchButton);
      expect(searchFunc).toHaveBeenCalledTimes(1);

      const newSearchTerm = `${searchTerm}a`;
      await user.clear(searchInput);
      await user.type(searchInput, newSearchTerm);
      await user.type(searchInput, "{Enter}");
      expect(searchFunc).toHaveBeenCalledTimes(2);
      expect(searchFunc).toHaveBeenCalledWith(
        expect.objectContaining({
          search: newSearchTerm,
        }),
      );
    });
  });
});
