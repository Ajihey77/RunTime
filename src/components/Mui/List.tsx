import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useHeaderModalStore } from "../../store/store";
import Modal from "../headerModal/Modal";
import { BorderBottom } from "@mui/icons-material";

// 친구목록에 사용하는 리스트 MUI
export default function CheckboxListSecondary() {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  // 모달 창 store
  const { modal, type, open, close } = useHeaderModalStore();
  const [x, setX] = React.useState(0);
  console.log(useHeaderModalStore.getState());
  const handleItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    open("list");
    console.log({
      top: rect.top + window.scrollY,
    });
    setX(Math.floor(rect.top + window.scrollY) - 295);
  };

  const styles = {
    list: {
      width: "100%",
      maxWidth: 360,
      bgcolor: "background.paper",
      position: "relative",
      overflow: "auto",
      maxHeight: 205,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      "& ul": { padding: 0 },
      /* 스크롤바 스타일 수정 */
      "&::-webkit-scrollbar": {
        width: "0px",
      },
      "&:hover::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#888",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    },
  };

  return (
    <div className="relative ">
      <List id="mainListModal" dense sx={styles.list}>
        {[0, 1, 2, 3, 4, 5].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem
              key={value}
              // secondaryAction={
              //   <Checkbox
              //     edge="end"
              //     onChange={handleToggle(value)}
              //     checked={checked.includes(value)}
              //     inputProps={{ "aria-labelledby": labelId }}
              //   />
              // }
              disablePadding
            >
              <ListItemButton
                // onClick={(e) => {
                //   e.stopPropagation();
                //   handleOpen();
                // }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick(e);
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value + 1}`}
                    src={`/static/images/avatar/${value + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      {type === "list" && <Modal y={-19} x={x} />}
    </div>
  );
}
