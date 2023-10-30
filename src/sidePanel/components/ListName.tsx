import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface ListNameProps {
  currentList: any;
  updateListName: (name: string) => Promise<void>;
  loading: boolean;
}

const ListName: React.FC<ListNameProps> = ({
  currentList,
  updateListName,
  loading,
}) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(currentList.name || "");

  const defaultListName = useMemo(
    () => currentList.name || "Create New List",
    [currentList.name]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    []
  );

  const handleDoneClick = useCallback(() => {
    if (name.trim() === "" || name === currentList.name) {
      setEdit(false);
      return;
    }
    updateListName(name.trim()); // Use trim to avoid white spaces
  }, [name, updateListName]);

  const handleCancelEdit = useCallback(() => {
    setName(currentList.name);
    setEdit(false);
  }, [currentList.name]);

  const handleEditClick = useCallback(() => {
    setEdit(true);
  }, []);

  useEffect(() => {
    setName(currentList.name || "");
    setEdit(false);
  }, [currentList.name]);

  return (
    <div className="flex-none h-[40px] flex items-center justify-start px-[8px] gap-[12px]">
      {edit ? (
        <>
          <input
            type="text"
            className="text-lg border-none w-[150px]"
            value={name}
            onChange={handleInputChange}
            autoFocus
          />
          {loading ? (
            <CircularProgress size={25} />
          ) : (
            <IconButton
              size="small"
              aria-label="done"
              disabled={!name.trim() || loading} // Check if name is empty after removing white spaces
              onClick={handleDoneClick}
            >
              <DoneIcon />
            </IconButton>
          )}
          <IconButton
            size="small"
            aria-label="clear"
            disabled={loading}
            onClick={handleCancelEdit}
          >
            <ClearIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Tooltip title={defaultListName}>
            <p className="text-lg w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
              {defaultListName}
            </p>
          </Tooltip>
          <div className={!name.trim() ? "cursor-not-allowed" : ""}>
            <IconButton
              size="small"
              aria-label="edit"
              disabled={!name.trim()} // Check if name is empty after removing white spaces
              onClick={handleEditClick}
            >
              <EditIcon />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
};

export default ListName;
