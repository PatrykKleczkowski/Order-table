package com.table.order.common.service;

import com.table.order.client.model.NewReservation;
import com.table.order.common.model.ReservationRequest;
import com.table.order.common.model.ReservationRequestStatus;
import com.table.order.common.repository.ReservationRequestRepository;
import com.table.order.common.security.model.User;
import com.table.order.restaurateur.model.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

    private ReservationRequestRepository reservationRequestRepository;
    private NotificationService notificationService;

    public ReservationRequest saveNew(NewReservation newReservation, User client, Restaurant restaurant) {
        ReservationRequest reservationRequest = new ReservationRequest();
        reservationRequest.setClient(client);
        reservationRequest.setRestaurant(restaurant);
        reservationRequest.setReservationDateTime(newReservation.getDateAndTime());
        reservationRequest.setNumberOfPersons(newReservation.getNumberOfPersons());
        reservationRequest.setStatus(ReservationRequestStatus.SEND);
        reservationRequest.setMessage(validateMessage(newReservation.getMessage()));

        ReservationRequest savedReservation = reservationRequestRepository.save(reservationRequest);

        notificationService.sendReservationRecived(restaurant);
        return savedReservation;
    }

    private String validateMessage(String message) {
        return message.trim().isEmpty() ? null : message.trim();
    }

    @Autowired
    public void setReservationRequestRepository(ReservationRequestRepository reservationRequestRepository) {
        this.reservationRequestRepository = reservationRequestRepository;
    }

    @Autowired
    public void setNotificationService(NotificationService notificationService) {
        this.notificationService = notificationService;
    }
}