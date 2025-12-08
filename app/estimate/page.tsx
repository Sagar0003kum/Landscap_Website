"use client";

import { useState, useEffect, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";

import AuthModal from "../components/AuthModal";
import { useAuth } from "../context/AuthContext";
import QuoteSuccessModal from "../components/QuoteSuccessModal";

import emailjs from "@emailjs/browser";

import "../home.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function EstimatePage() {
  emailjs.init("VYdNBLKU2JIYKKcva");

  const [selectedProjectType, setSelectedProjectType] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedFenceType, setSelectedFenceType] = useState("");
  const [dimensions, setDimensions] = useState<any>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const [showAuth, setShowAuth] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const { user, logout } = useAuth();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const hasProjectType = !!selectedProjectType;
    const hasMaterial = !!selectedMaterial;
    const hasFenceType =
      selectedProjectType === "Fence" ? !!selectedFenceType : true;

    let hasDimensions = false;

    switch (selectedProjectType) {
      case "Deck":
        hasDimensions =
          dimensions.height > 0 &&
          dimensions.width > 0 &&
          dimensions.depth > 0;
        break;
      case "Fence":
        hasDimensions =
          dimensions.height > 0 && dimensions.perimeter > 0;
        break;
      case "Pergola":
      case "Pavilion":
        hasDimensions =
          dimensions.height > 0 &&
          dimensions.width > 0 &&
          dimensions.length > 0;
        break;
      default:
        hasDimensions = false;
    }

    setIsFormValid(hasProjectType && hasMaterial && hasDimensions && hasFenceType);
  }, [selectedProjectType, selectedMaterial, selectedFenceType, dimensions]);

  useEffect(() => {
    setDimensions({});
    setSelectedMaterial("");
    setSelectedFenceType("");
  }, [selectedProjectType]);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    if (!user) {
      setShowAuth(true);
      return;
    }

    try {
      await emailjs.send("service_my1ew5p", "template_ygvpo45", {
        from_name:
          (user.displayName ||
            user.email.split("@")[0] ||
            "Customer") + "",
        user_email: user.email + "",
        project_type: selectedProjectType + "",
        material: selectedMaterial + "",
        fence_type: selectedFenceType + "",
        dimensions: formatDimensions() + "",
        to_email: user.email + ""
      });

      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
    } catch (e) {}
    handleMenuClose();
  };

  const formatDimensions = () => {
    switch (selectedProjectType) {
      case "Deck":
      case "Pergola":
      case "Pavilion":
        return `${dimensions.height || 0}'H × ${dimensions.width || 0}'W × ${
          dimensions.depth || dimensions.length || 0
        }'D`;
      case "Fence":
        return `${dimensions.height || 0}'H × ${dimensions.perimeter || 0}' perimeter`;
      default:
        return "";
    }
  };

  return (
    <>
      <AuthModal show={showAuth} onClose={() => setShowAuth(false)} />

      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ px: 4, pt: 1 }}
      >
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: "#2f5b2f" }}
          >
            Landscape Craftsmen · Calgary, AB
          </Typography>

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
                "&:hover": {
                  borderColor: "#204020",
                  backgroundColor: "#f1f7f1"
                }
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
              >
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <main className="home-wrapper flex">
        <div className="w-185">
          <div className="text-left py-8 pl-5 primary-colour w-185 text-white font-bold text-4xl rounded-r-4xl">
            <p>Get a Free Estimate On Your Next Project</p>
          </div>

          <form
            className="mt-10 p-5 pr-0 border-green-800 border-4 text-xl w-185"
            onSubmit={handleFormSubmit}
          >
            <p className="font-semibold">Project Type:</p>

            <input
              type="radio"
              name="proj_type"
              value="Deck"
              checked={selectedProjectType === "Deck"}
              onChange={(e) => setSelectedProjectType(e.target.value)}
            />
            <label> Deck</label>
            <br />

            <input
              type="radio"
              name="proj_type"
              value="Fence"
              checked={selectedProjectType === "Fence"}
              onChange={(e) => setSelectedProjectType(e.target.value)}
            />
            <label> Fence</label>
            <br />

            <input
              type="radio"
              name="proj_type"
              value="Pergola"
              checked={selectedProjectType === "Pergola"}
              onChange={(e) => setSelectedProjectType(e.target.value)}
            />
            <label> Pergola</label>
            <br />

            <input
              type="radio"
              name="proj_type"
              value="Pavilion"
              checked={selectedProjectType === "Pavilion"}
              onChange={(e) => setSelectedProjectType(e.target.value)}
            />
            <label> Pavilion</label>
            <br />
            <br />

            {selectedProjectType === "Deck" && (
              <>
                <p className="font-semibold">Material:</p>
                <label>
                  <input
                    type="radio"
                    name="material"
                    value="PVC"
                    checked={selectedMaterial === "PVC"}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                  />{" "}
                  PVC
                </label>
                <br />

                <label>
                  <input
                    type="radio"
                    name="material"
                    value="Wood"
                    checked={selectedMaterial === "Wood"}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                  />{" "}
                  Wood
                </label>
                <br />

                <label>
                  <input
                    type="radio"
                    name="material"
                    value="Composite"
                    checked={selectedMaterial === "Composite"}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                  />{" "}
                  Composite
                </label>
                <br />
                <br />
              </>
            )}

            {selectedProjectType === "Fence" && (
              <>
                <p className="font-semibold">Material:</p>

                <label>
                  <input
                    type="radio"
                    name="material"
                    value="Aluminum"
                    checked={selectedMaterial === "Aluminum"}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                  />{" "}
                  Aluminum
                </label>
                <br />

                <label>
                  <input
                    type="radio"
                    name="material"
                    value="Vinyl"
                    checked={selectedMaterial === "Vinyl"}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                  />{" "}
                  Vinyl
                </label>
                <br />

                <label>
                  <input
                    type="radio"
                    name="material"
                    value="Metal"
                    checked={selectedMaterial === "Metal"}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                  />{" "}
                  Metal
                </label>
                <br />

                <label>
                  <input
                    type="radio"
                    name="material"
                    value="Wood"
                    checked={selectedMaterial === "Wood"}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                  />{" "}
                  Wood
                </label>
                <br />

                <label>
                  <input
                    type="radio"
                    name="material"
                    value="Composite"
                    checked={selectedMaterial === "Composite"}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                  />{" "}
                  Composite
                </label>
                <br />
                <br />
              </>
            )}

            {selectedProjectType === "Fence" && (
              <>
                <p className="font-semibold">Type:</p>

                <label>
                  <input
                    type="radio"
                    name="fence_type"
                    value="Lattice"
                    checked={selectedFenceType === "Lattice"}
                    onChange={(e) => setSelectedFenceType(e.target.value)}
                  />{" "}
                  Lattice
                </label>
                <br />

                <label>
                  <input
                    type="radio"
                    name="fence_type"
                    value="Board on Board"
                    checked={selectedFenceType === "Board on Board"}
                    onChange={(e) => setSelectedFenceType(e.target.value)}
                  />{" "}
                  Board on Board
                </label>
                <br />

                <label>
                  <input
                    type="radio"
                    name="fence_type"
                    value="Split Rail"
                    checked={selectedFenceType === "Split Rail"}
                    onChange={(e) => setSelectedFenceType(e.target.value)}
                  />{" "}
                  Split Rail
                </label>
                <br />

                <label>
                  <input
                    type="radio"
                    name="fence_type"
                    value="Tongue and Groove"
                    checked={selectedFenceType === "Tongue and Groove"}
                    onChange={(e) => setSelectedFenceType(e.target.value)}
                  />{" "}
                  Tongue and Groove
                </label>
                <br />

                <label>
                  <input
                    type="radio"
                    name="fence_type"
                    value="Picket"
                    checked={selectedFenceType === "Picket"}
                    onChange={(e) => setSelectedFenceType(e.target.value)}
                  />{" "}
                  Picket
                </label>
                <br />

                <label>
                  <input
                    type="radio"
                    name="fence_type"
                    value="Chain Link"
                    checked={selectedFenceType === "Chain Link"}
                    onChange={(e) => setSelectedFenceType(e.target.value)}
                  />{" "}
                  Chain Link
                </label>
                <br />

                <label>
                  <input
                    type="radio"
                    name="fence_type"
                    value="Masonry"
                    checked={selectedFenceType === "Masonry"}
                    onChange={(e) => setSelectedFenceType(e.target.value)}
                  />{" "}
                  Masonry
                </label>
                <br />
                <br />
              </>
            )}

            {selectedProjectType === "Deck" && (
              <>
                <p className="font-semibold">Dimensions (sq/ft):</p>
                <div className="flex gap-3 mt-2">
                  <input
                    type="number"
                    placeholder="Height"
                    value={dimensions.height || ""}
                    onChange={(e) =>
                      setDimensions({
                        ...dimensions,
                        height: parseFloat(e.target.value) || 0
                      })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Width"
                    value={dimensions.width || ""}
                    onChange={(e) =>
                      setDimensions({
                        ...dimensions,
                        width: parseFloat(e.target.value) || 0
                      })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Depth"
                    value={dimensions.depth || ""}
                    onChange={(e) =>
                      setDimensions({
                        ...dimensions,
                        depth: parseFloat(e.target.value) || 0
                      })
                    }
                  />
                </div>
              </>
            )}

            {selectedProjectType === "Fence" && (
              <>
                <p className="font-semibold">Dimensions (ln/ft):</p>
                <div className="flex gap-3 mt-2">
                  <input
                    type="number"
                    placeholder="Height"
                    value={dimensions.height || ""}
                    onChange={(e) =>
                      setDimensions({
                        ...dimensions,
                        height: parseFloat(e.target.value) || 0
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Perimeter"
                    value={dimensions.perimeter || ""}
                    onChange={(e) =>
                      setDimensions({
                        ...dimensions,
                        perimeter: parseFloat(e.target.value) || 0
                      })
                    }
                  />
                </div>
              </>
            )}

            {selectedProjectType === "Pergola" && (
              <>
                <p className="font-semibold">Dimensions (sq/ft):</p>
                <div className="flex gap-3 mt-2">
                  <input
                    type="number"
                    placeholder="Height"
                    value={dimensions.height || ""}
                    onChange={(e) =>
                      setDimensions({
                        ...dimensions,
                        height: parseFloat(e.target.value) || 0
                      })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Width"
                    value={dimensions.width || ""}
                    onChange={(e) =>
                      setDimensions({
                        ...dimensions,
                        width: parseFloat(e.target.value) || 0
                      })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Length"
                    value={dimensions.length || ""}
                    onChange={(e) =>
                      setDimensions({
                        ...dimensions,
                        length: parseFloat(e.target.value) || 0
                      })
                    }
                  />
                </div>
              </>
            )}

            {selectedProjectType === "Pavilion" && (
              <>
                <p className="font-semibold">Dimensions (sq/ft):</p>
                <div className="flex gap-3 mt-2">
                  <input
                    type="number"
                    placeholder="Height"
                    value={dimensions.height || ""}
                    onChange={(e) =>
                      setDimensions({
                        ...dimensions,
                        height: parseFloat(e.target.value) || 0
                      })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Width"
                    value={dimensions.width || ""}
                    onChange={(e) =>
                      setDimensions({
                        ...dimensions,
                        width: parseFloat(e.target.value) || 0
                      })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Length"
                    value={dimensions.length || ""}
                    onChange={(e) =>
                      setDimensions({
                        ...dimensions,
                        length: parseFloat(e.target.value) || 0
                      })
                    }
                  />
                </div>
              </>
            )}

            <div className="flex justify-end">
              <input
                type="submit"
                value="Get Quote"
                disabled={!isFormValid}
                className="border rounded-4xl border-green-800 p-4 hover:bg-green-800 hover:text-white hover:scale-95 active:scale-100 mt-20 mb-5 mr-10 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </form>
        </div>

        <div className="relative image-that-wont-position w-[450px] h-[727px] rounded-xl overflow-hidden scale-80 dumnbass-image-shadow">
          <Image
            src="/projects/project-7.JPG"
            alt="Project sample"
            fill
            className="object-cover"
          />
        </div>

        <QuoteSuccessModal
          open={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
        />
      </main>
    </>
  );
}
