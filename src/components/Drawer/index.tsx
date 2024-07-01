"use client";

import useColorMode from "@/hooks/useColorMode";
import {
  Drawer as JoyDrawer,
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  ModalClose,
  Sheet,
  Stack,
} from "@mui/joy";
import colors from "tailwindcss/colors";
import React, { EventHandler } from "react";

export default function Drawer({
  open,
  title,
  onClose,
  onConfirm,
  children,
}: {
  open: boolean;
  title: string;
  onClose: EventHandler<any>;
  onConfirm: EventHandler<any>;
  children: React.ReactNode;
}) {
  return (
    <JoyDrawer
      size="md"
      variant="plain"
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        content: {
          sx: {
            bgcolor: "transparent",
            p: { md: 3, sm: 0 },
            boxShadow: "none",
          },
        },
      }}
    >
      <Sheet
        sx={{
          borderRadius: "md",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100%",
          overflow: "auto",
        }}
        className="dark:bg-boxdark"
      >
        <DialogTitle>
          <h2 className="text-black dark:text-white">{title}</h2>
        </DialogTitle>
        <ModalClose />
        <Divider sx={{ mt: "auto" }} />
        <DialogContent sx={{ gap: 2 }}>
          {/* <FormControl>
            <FormLabel sx={{ typography: "title-md", fontWeight: "bold" }}>
              Property type
            </FormLabel>
            <RadioGroup
              value={type || ""}
              onChange={(event) => {
                setType(event.target.value);
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                  gap: 1.5,
                }}
              >
                {[
                  {
                    name: "House",
                    icon: <FaHome />,
                  },
                  {
                    name: "Apartment",
                    icon: <MdApartment />,
                  },
                  {
                    name: "Guesthouse",
                    icon: <FaHouseUser />,
                  },
                  {
                    name: "Hotel",
                    icon: <FaHotel />,
                  },
                ].map((item) => (
                  <Card
                    key={item.name}
                    sx={{
                      boxShadow: "none",
                      "&:hover": { bgcolor: "background.level1" },
                    }}
                  >
                    <CardContent>
                      {item.icon}
                      <Typography level="title-md">{item.name}</Typography>
                    </CardContent>
                    <Radio
                      disableIcon
                      overlay
                      checked={type === item.name}
                      variant="outlined"
                      color="neutral"
                      value={item.name}
                      sx={{ mt: -2 }}
                      slotProps={{
                        action: {
                          sx: {
                            ...(type === item.name && {
                              borderWidth: 2,
                              borderColor:
                                "var(--joy-palette-primary-outlinedBorder)",
                            }),
                            "&:hover": {
                              bgcolor: "transparent",
                            },
                          },
                        },
                      }}
                    />
                  </Card>
                ))}
              </Box>
            </RadioGroup>
          </FormControl>

          <Typography level="title-md" fontWeight="bold" sx={{ mt: 1 }}>
            Amenities
          </Typography>
          <div role="group" aria-labelledby="rank">
            <List
              orientation="horizontal"
              size="sm"
              sx={{
                "--List-gap": "12px",
                "--ListItem-radius": "20px",
              }}
            >
              {["Wi-fi", "Washer", "A/C", "Kitchen"].map((item, index) => {
                const selected = amenities.includes(index);
                return (
                  <ListItem key={item}>
                    <AspectRatio
                      variant={selected ? "solid" : "outlined"}
                      color={selected ? "primary" : "neutral"}
                      ratio={1}
                      sx={{ width: 20, borderRadius: 20, ml: -0.5, mr: 0.75 }}
                    >
                      <div>{selected && <IoMdDoneAll fontSize="md" />}</div>
                    </AspectRatio>
                    <Checkbox
                      size="sm"
                      color="neutral"
                      disableIcon
                      overlay
                      label={item}
                      variant="outlined"
                      checked={selected}
                      onChange={(event) =>
                        setAmenities((prev) => {
                          const set = new Set([...prev, index]);
                          if (!event.target.checked) {
                            set.delete(index);
                          }
                          // @ts-ignore
                          return [...set];
                        })
                      }
                      slotProps={{
                        action: {
                          sx: {
                            "&:hover": {
                              bgcolor: "transparent",
                            },
                          },
                        },
                      }}
                    />
                  </ListItem>
                );
              })}
            </List>
          </div>

          <Typography level="title-md" fontWeight="bold" sx={{ mt: 2 }}>
            Booking options
          </Typography>
          <FormControl orientation="horizontal">
            <Box sx={{ flex: 1, pr: 1 }}>
              <FormLabel sx={{ typography: "title-sm" }}>
                Instant booking
              </FormLabel>
              <FormHelperText sx={{ typography: "body-sm" }}>
                Listings that you can book without waiting for host approval.
              </FormHelperText>
            </Box>
            <Switch />
          </FormControl>

          <FormControl orientation="horizontal">
            <Box sx={{ flex: 1, mt: 1, mr: 1 }}>
              <FormLabel sx={{ typography: "title-sm" }}>
                Self check-in
              </FormLabel>
              <FormHelperText sx={{ typography: "body-sm" }}>
                Easy access to the property when you arrive.
              </FormHelperText>
            </Box>
            <Switch />
          </FormControl> */}

          {children}
        </DialogContent>

        <Divider sx={{ mt: "auto" }} />
        <Stack
          direction="row"
          justifyContent="space-between"
          useFlexGap
          spacing={1}
        >
          <Button variant="outlined" color="neutral" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Salvar alterações</Button>
        </Stack>
      </Sheet>
    </JoyDrawer>
  );
}
