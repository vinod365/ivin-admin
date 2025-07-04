"use client";

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <div className='flex gap-4'>
      <p onClick={(e: any)=> handleClick(e)}>
        Admin user
      </p>
      <KeyboardArrowDownIcon/>
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: '40px', // move it 4px down
            background:"#A155E6",
            boxShadow:"none",
            borderRadius:"12px"
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
           
        }}
      >
        <div className='flex flex-col p-8 gap-8 rounded-[12px] text-white '>
        <p className='cursor-pointer'  onClick={() => router.push("/profile")} >Edit Profile</p>
        <p className='cursor-pointer' onClick={() => router.push("/manage-password")}>Manage Password</p>
        <p className='cursor-pointer'> Log out</p>
        </div>
      </Popover>
    </div>
  );
}
