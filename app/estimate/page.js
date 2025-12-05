"use client"
import { useState, useEffect, mouseEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import AuthModal from "../components/AuthModal";
import { useAuth } from "../context/AuthContext";

import "../home.css";

// MUI imports
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";


export default function Page() {

  const [selectedProjectType, setSelectedProjectType] = useState('');


  const [showAuth, setShowAuth] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const { user, logout } = useAuth();


  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      handleMenuClose();
    }
  };


  return (
    <>
      <AuthModal show={showAuth} onClose={() => setShowAuth(false)} />


      {/* 🌿 Top Bar with Material UI */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ px: 4, pt: 1 }}
      >
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Brand / Logo */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#2f5b2f" }}>
            Landscape Craftsmen · Calgary, AB
          </Typography>

          {/* Right side: Login OR Profile */}
          {!user ? (
            <Button
              variant="outlined"
              size="small"
              onClick={() => setShowAuth(true)}
              sx={{
                textTransform: "none",
                borderRadius: "999px",
                borderColor: "#2f5b2f",
                color: "#2f5b2f",
                "&:hover": { borderColor: "#204020", backgroundColor: "#f1f7f1" },
              }}
            >
              Login / Sign Up
            </Button>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                size="small"
                onClick={handleMenuOpen}
                sx={{ mr: 1, color: "#2f5b2f" }}
              >
                <AccountCircle />
              </IconButton>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "#2f5b2f", cursor: "pointer" }}
                onClick={handleMenuOpen}
              >
                {user.displayName || user.email}
              </Typography>

              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>    
    <main className='home-wrapper'>
      <div>
        <div className='text-left py-8 pl-5 primary-colour w-180 text-white font-bold text-4xl rounded-r-4xl'>
          <p>
            Get a Free Estimate On You Next Project
          </p> 
        </div>
        <div>
          <p className='mt-5 ml-5 text-2xl w-200 font-light'>
            All that we require are your ideas to visualize the project you want.
          </p>
        </div>   


        {/* STYLE THESE COMPONENTS */}
        <form className='mt-10 p-5 border-green-900 border-4'>
          {/* Project Type */}
          <p>Project Type:</p><br/>
          <input 
            type="radio" 
            id="deck" 
            name="proj_type" 
            value="Deck"
            checked={selectedProjectType === 'Deck'}
            onChange={(e) => setSelectedProjectType(e.target.value)}
          />
          <label htmlFor="deck">Deck</label><br/>
          <input 
            type="radio" 
            id="fence" 
            name="proj_type" 
            value="Fence"
            checked={selectedProjectType === 'Fence'}
            onChange={(e) => setSelectedProjectType(e.target.value)}
          />
          <label htmlFor="fence">Fence</label><br/>
          <input 
            type="radio" 
            id="pergola" 
            name="proj_type" 
            value="Pergola"
            checked={selectedProjectType === 'Pergola'}
            onChange={(e) => setSelectedProjectType(e.target.value)}
          />
          <label htmlFor="Pergola">Pergola</label><br/>
          <input 
            type="radio" 
            id="pavilion" 
            name="proj_type" 
            value="Pavilion"
            checked={selectedProjectType === 'Pavilion'}
            onChange={(e) => setSelectedProjectType(e.target.value)}
          />
          <label htmlFor="Pavilion">Pavilion</label><br/>

          {selectedProjectType === 'Deck' && (
            <div>
              <p>Material:</p>
              <label><input type="radio" name="material" value="PVC" /> PVC</label><br/>
              <label><input type="radio" name="material" value="Wood" /> Wood</label><br/>
              <label><input type="radio" name="material" value="Composite" /> Composite</label>
            </div>
          )}
          {selectedProjectType === 'Fence' && (
            <div>
              <p>Material:</p>
              <label><input type="radio" name="material" value="Aluminum" /> Aluminum</label><br/>
              <label><input type="radio" name="material" value="Vinyl" /> Vinyl</label><br/>
              {/* ****Add other Fence materials similarly ************/}
            </div>



            // Repeat for pergola and pavilion
            


          )}
          

          {selectedProjectType === 'Deck' && (
            <div>
              <p>Dimensions:</p>
              <input type="number" placeholder="Height" name="height" /><br/>
              <input type="number" placeholder="Width" name="width" /><br/>
              <input type="number" placeholder="Depth" name="depth" />
            </div>
          )}
          {selectedProjectType === 'Fence' && (
            <div>
              <p>Dimensions (ft):</p>
              <input type="number" placeholder="Height" name="height" />
            </div>
          )}
                    

          {/* Project Material/Type */}

          {/* Project Dimensions */}








          {/* Submit sends the estimation summary and calculated amount to user email
          
          (If not enough time just use it to appear modal that says it was sent to the user's email)
          
          */}
          {/* <input type="submit" value="Submit">Get Quote</input> */}
        </form>



    
      </div>

    </main>

    </>

  );

}





/**
 * On Form Submit shows modal to sign in otherwise if user already has signed in shows modal "Successfully sent to {user's email}"
 * 
 * To keep it secure it only sends the calculated estimate on the email not on the screen
 * 
 * Project Type:
 * Deck
 * Fence
 * Pergola
 * Pavilion
 * 
 * 
 * 
 * 
 * Deck
 * Material: 
 * PVC
 * Wood (Cedar, Pressure Treated Lumber, Redwood, White Oak, Mahogany, Tropical Hardwoods)
 * Composite
 * 
 * Dimensions:
 * Height
 * Width
 * Depth
 * 
 * 
 * 
 * Fence
 * Material: 
 * Aluminum
 * Vinyl
 * Metal
 * Composite
 * Wood (Treated Wood, Cedar, Bamboo)
 * 
 * Type:
 * Lattice
 * Board on Board
 * Split Rail
 * Tongue and Groove
 * Picket
 * Chain Link
 * Masonry
 * 
 * Dimensions:
 * Height
 * 
 * 
 * 
 * Pergola
 * Material: 
 * PVC
 * Wood (Cedar, Pressure Treated Lumber, Redwood, White Oak, Mahogany, Tropical Hardwoods)
 * Composite
 * Fiberglass
 * Aluminum
 * Steel
 * 
 * Dimensions:
 * Height
 * Width
 * Length
 * 
 * 
 * 
 * Pavilion
 * Material: 
 * PVC
 * Wood (Cedar, Pressure Treated Lumber, Redwood, White Oak, Mahogany, Tropical Hardwoods)
 * Composite
 * Fiberglass
 * Aluminum
 * Steel
 * 
 * Dimensions:
 * Height
 * Width
 * Length
 * 
 * 
 */
