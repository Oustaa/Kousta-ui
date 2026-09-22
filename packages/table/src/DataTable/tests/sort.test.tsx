import { fireEvent, render, screen } from "@testing-library/react";
import DataTable from "..";
import {
  data,
  headers,
  UserType,
  renderTableWithExtraProps,
} from "./test-setup";
import { TablePropsProvider } from "../PropsContext";

describe("Table Sorting", () => {
  describe("Static Table", () => {
    // default sort number and string
    it("should sort by string value", () => {
      renderTableWithExtraProps();

      screen.logTestingPlaygroundURL();

      const nameHeader = screen.getByText(/name/i);

      fireEvent.click(nameHeader);
      let rows = screen.getAllByRole("row").slice(1);
      expect(rows[0]).toHaveTextContent("kaoutar Taki");
      expect(rows[1]).toHaveTextContent("Oussama Tailba");

      fireEvent.click(nameHeader);
      rows = screen.getAllByRole("row").slice(1);
      expect(rows[0]).toHaveTextContent("Oussama Tailba");
      expect(rows[1]).toHaveTextContent("kaoutar Taki");
    });
    it("should sort by number value", () => {
      renderTableWithExtraProps();

      let rows = screen.getAllByRole("row").slice(1);
      expect(rows[0]).toHaveTextContent("27");
      expect(rows[1]).toHaveTextContent("22");

      const ageHeader = screen.getByText(/age/i);

      fireEvent.click(ageHeader);
      rows = screen.getAllByRole("row").slice(1);
      expect(rows[0]).toHaveTextContent("22");
      expect(rows[1]).toHaveTextContent("27");

      fireEvent.click(ageHeader);
      rows = screen.getAllByRole("row").slice(1);
      expect(rows[0]).toHaveTextContent("27");
      expect(rows[1]).toHaveTextContent("22");
    });
    it("should sort by sort.name when provided", () => {
      render(
        <DataTable<UserType>
          data={data}
          headers={{
            ...headers,
            user: {
              exec() {
                return (
                  <div>
                    <p>this is returned from exec</p>
                  </div>
                );
              },
              sortBy: {
                name: "age",
              },
            },
          }}
          loading={false}
          title="this is a title"
          keyExtractor={(row) => row.name}
        />,
      );

      let rows = screen.getAllByRole("row").slice(1);
      expect(rows[0]).toHaveTextContent("27");
      expect(rows[1]).toHaveTextContent("22");

      const userHeader = screen.getByText(/User/i);

      fireEvent.click(userHeader);
      rows = screen.getAllByRole("row").slice(1);
      expect(rows[0]).toHaveTextContent("22");
      expect(rows[1]).toHaveTextContent("27");

      fireEvent.click(userHeader);
      rows = screen.getAllByRole("row").slice(1);
      expect(rows[0]).toHaveTextContent("27");
      expect(rows[1]).toHaveTextContent("22");
    });

    it("should call sortFunc when provided", () => {
      const sortFunc = jest.fn();
      render(
        <DataTable<UserType>
          data={data}
          headers={{
            ...headers,
            user: {
              exec() {
                return (
                  <div>
                    <p>this is returned from exec</p>
                  </div>
                );
              },
              sortBy: {
                sortFunc,
              },
            },
          }}
          loading={false}
          title="this is a title"
          keyExtractor={(row) => row.name}
        />,
      );

      sortFunc.mockClear();

      const userHeader = screen.getByText(/user/i);
      fireEvent.click(userHeader);

      expect(sortFunc).toHaveBeenCalled();
    });
  });

  describe("Dynamic Table", () => {
    it("should call getData with order props", () => {
      const getDataFN = jest.fn();

      render(
        <DataTable<UserType>
          data={data}
          actions={{
            get: getDataFN,
          }}
          headers={headers}
          loading={false}
          title="this is a title"
          keyExtractor={(row) => row.name}
        />,
      );

      getDataFN.mockClear();

      const ageHeader = screen.getByText(/age/i);

      fireEvent.click(ageHeader);
      expect(getDataFN).toHaveBeenCalledWith({ sortBy: "age", direction: 1 });

      fireEvent.click(ageHeader);
      expect(getDataFN).toHaveBeenCalledWith({ sortBy: "age", direction: -1 });

      expect(getDataFN).toHaveBeenCalledTimes(2);
    });

    it("should call getData with sortBy.name when specified", () => {
      const getDataFN = jest.fn();

      render(
        <DataTable<UserType>
          data={data}
          actions={{
            get: getDataFN,
          }}
          headers={{
            ...headers,
            age: {
              value: "age",
              sortBy: {
                name: "age.age",
              },
            },
          }}
          loading={false}
          title="this is a title"
          keyExtractor={(row) => row.name}
        />,
      );

      const ageHeader = screen.getByText(/age/i);

      fireEvent.click(ageHeader);
      expect(getDataFN).toHaveBeenCalledWith({
        sortBy: "age.age",
        direction: 1,
      });
    });

    describe("sort option object, and table props provider", () => {
      it("should call TablePropsProvider props func", () => {
        const propsFunc = jest.fn();

        render(
          <TablePropsProvider
            sort={{
              props: propsFunc,
            }}
          >
            <DataTable<UserType>
              data={data}
              headers={{
                ...headers,
                age: {
                  value: "age",
                  sortBy: {
                    name: "age.age",
                  },
                },
              }}
              loading={false}
              title="this is a title"
              keyExtractor={(row) => row.name}
              // isStatic={false}
              actions={{
                get() { },
              }}
            />
            ,
          </TablePropsProvider>,
        );

        const ageHeader = screen.getByText(/age/i);
        expect(ageHeader).toBeInTheDocument();

        fireEvent.click(ageHeader);
        expect(propsFunc).toHaveBeenCalled();
      });

      it("should call options sort.props func, over TablePropsProvider's", () => {
        const prPropsFunc = jest.fn();
        const opPropsFunc = jest.fn();

        render(
          <TablePropsProvider
            sort={{
              props: prPropsFunc,
            }}
          >
            <DataTable<UserType>
              data={data}
              headers={{
                ...headers,
                age: {
                  value: "age",
                  sortBy: {
                    name: "age.age",
                  },
                },
              }}
              loading={false}
              title="this is a title"
              keyExtractor={(row) => row.name}
              // isStatic={false}
              actions={{
                get() { },
              }}
              options={{
                sort: {
                  props: opPropsFunc,
                },
              }}
            />
            ,
          </TablePropsProvider>,
        );

        const ageHeader = screen.getByText(/age/i);
        expect(ageHeader).toBeInTheDocument();

        fireEvent.click(ageHeader);

        expect(prPropsFunc).not.toHaveBeenCalled();
        expect(opPropsFunc).toHaveBeenCalled();
      });
    });
  });

  // We wil stick with default icon for now
  // describe("sort Icons", () => {
  //   it("should render icons when passed", () => {
  //     render(
  //       <TablePropsProvider>
  //         <DataTable<UserType>
  //           data={data}
  //           headers={{
  //             ...headers,
  //             age: {
  //               value: "age",
  //             },
  //           }}
  //           loading={false}
  //           title="this is a title"
  //           keyExtractor={(row) => row.name}
  //           // isStatic={false}
  //           actions={{
  //             get() {},
  //           }}
  //           config={{
  //             icons: {
  //               sort: () => "Desc",
  //             },
  //           }}
  //         />
  //         ,
  //       </TablePropsProvider>,
  //     );
  //
  //     const descIcon = screen.getByText(/desc/i);
  //
  //     expect(descIcon).toBeInTheDocument();
  //   });
  // });
});
