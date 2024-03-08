package org.lamisplus.modules.laboratory.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.audit4j.core.util.Log;
import org.lamisplus.modules.laboratory.domain.dto.ResultDTO;
import org.lamisplus.modules.laboratory.domain.dto.ResultResponse;
import org.lamisplus.modules.laboratory.domain.dto.SingleResultProjectionDTO;
import org.lamisplus.modules.laboratory.domain.entity.Result;
import org.lamisplus.modules.laboratory.domain.entity.Test;
import org.lamisplus.modules.laboratory.domain.mapper.LabMapper;
import org.lamisplus.modules.laboratory.repository.ResultRepository;
import org.lamisplus.modules.laboratory.repository.TestRepository;
import org.lamisplus.modules.base.domain.entities.User;
import org.lamisplus.modules.base.service.UserService;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.lamisplus.modules.laboratory.utility.LabUtils.RESULT_REPORTED;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResultService {
    private final ResultRepository repository;
    private final LabMapper labMapper;
    private final PersonRepository personRepository;
    private final TestRepository testRepository;
    private final UserService userService;

    public ResultDTO Save(ResultDTO resultDTO) {
        Result result = labMapper.toResult(resultDTO);

        result.setUuid(UUID.randomUUID().toString());
        log.info("result {}", result);
        Test test = testRepository.findByIdAndArchived(result.getTestId(), 0).orElse(null);
        assert test != null;
        test.setLabTestOrderStatus(RESULT_REPORTED);
        testRepository.save(test);

        result.setPatientUuid(test.getPatientUuid());
        result.setPatientId(test.getPatientId());
        result.setFacilityId(getCurrentUserOrganization());
        result.setArchived(0);
        Log.info("FF: " + result);
        return labMapper.toResultDto(repository.save(result));
    }

    private Long getCurrentUserOrganization() {
        Optional<User> userWithRoles = userService.getUserWithRoles();
        return userWithRoles.map(User::getCurrentOrganisationUnitId).orElse(null);
    }

    public ResultDTO Update(int order_id, ResultDTO resultDTO) {
        Result updated_result = labMapper.toResult(resultDTO);
        return labMapper.toResultDto(repository.save(updated_result));
    }

    public String Delete(Integer id) {
        Result labOrder = repository.findByIdAndArchived(id, 0).orElse(null);
        //repository.delete(labOrder);
        labOrder.setArchived(1);
        repository.save(labOrder);

        return id.toString() + " deleted successfully";
    }

    public ResultDTO GetResultsById(Integer id) {
        return labMapper.toResultDto(repository.findByIdAndArchived(id, 0).orElse(null));
    }

    public ResultDTO GetResultsByTestId(Integer TestId) {
        List<Result> resultList = repository.findAllByTestIdAndArchived(TestId, 0);

        if (resultList.size() > 0) {
            return labMapper.toResultDto(resultList.get(0));
        } else {
            return new ResultDTO();
        }
    }

    public SingleResultProjectionDTO getResultByPatientUuidAndDateResultReceived(String patientUuid, String dateResultReceived) {

        LocalDate date = LocalDate.parse(dateResultReceived);

        Optional<SingleResultProjectionDTO> result = repository.findByPatientUuidAndDateResultReceived(patientUuid, date.atStartOfDay(), getCurrentUserOrganization());

        if (result.isPresent()) {
            return result.get();
        } else {
            // Handle the case where the result is not present
            throw new EntityNotFoundException("Result not found for patientUuid: " + patientUuid + " and dateResultReceived: " + dateResultReceived);
        }
    }


//public SingleResultProjectionDTO getResultByPatientUuidAndDateResultReceived (String patientUuid, LocalDate dateResultReceived) {
//
//        return repository.findByPatientUuidAndDateResultReceived(patientUuid,dateResultReceived,getCurrentUserOrganization()).get();
//}
//    public ResultDTO getResultByPatientUuidAndDateResultReceived(String patientUuid, String dateResultReceived) {
//
//        LocalDate date = LocalDate.parse(dateResultReceived);
//
//        Optional<Result> result = repository.findByPatientUuidAndDateResultReceived(patientUuid, date.atStartOfDay());
//        if (!result.isPresent()) {
//
//            //return StringUtils.hasText(resultDTO.getResultReported()) ? ResultResponse.builder().result(resultDTO.getResultReported()).build() : ResultResponse.builder().result(response).build();
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No record found for Result");
//        }
//
//
//        return labMapper.toResultDto(result.get());
//    }
}
